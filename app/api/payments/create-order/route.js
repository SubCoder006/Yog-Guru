// app/api/payments/create-order/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createRazorpayOrder, SUBSCRIPTION_PLANS } from '@/lib/razorpay';

// Ensure Node.js runtime (Razorpay SDK requires Node APIs)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Validate Razorpay env first to fail fast with a clear error
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay is not configured. Missing RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET.' },
        { status: 500 }
      );
    }

    let session = await getServerSession(authOptions);
    // Fallback to custom session via header if next-auth session is absent
    if (!session) {
      const headers = request.headers;
      const userId = headers.get('x-user-id');
      if (userId) {
        session = { user: { id: userId } };
      }
    }
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, customAmount, currency = 'INR', description } = body;

    let amountToCharge;
    let currencyToUse = currency;

    if (planId) {
      if (!SUBSCRIPTION_PLANS[planId]) {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
      }
      const plan = SUBSCRIPTION_PLANS[planId];
      amountToCharge = plan.amount;
      currencyToUse = plan.currency || currencyToUse;
    } else if (typeof customAmount === 'number' && customAmount > 0) {
      amountToCharge = customAmount;
    } else {
      return NextResponse.json({ error: 'Missing planId or customAmount' }, { status: 400 });
    }

    // Normalize amount to number and prepare a short receipt (<= 40 chars)
    const normalizedAmount = Math.round(Number(amountToCharge));
    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amount to charge' }, { status: 400 });
    }

    const userIdTail = String(session.user.id || '').replace(/[^a-zA-Z0-9]/g, '').slice(-10);
    let receipt = `rcpt_${Date.now()}_${userIdTail}`;
    if (receipt.length > 40) receipt = receipt.slice(0, 40);

    let order;
    try {
      order = await createRazorpayOrder(
        normalizedAmount,
        currencyToUse,
        receipt
      );
    } catch (e) {
      return NextResponse.json(
        { error: `Razorpay order creation failed: ${e?.message || 'Unknown error'}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      receipt: order.receipt,
      description: description || (planId ? SUBSCRIPTION_PLANS[planId]?.name : 'One-time payment')
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}