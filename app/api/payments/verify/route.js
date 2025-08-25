// app/api/payments/verify/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyPaymentSignature, SUBSCRIPTION_PLANS } from '@/lib/razorpay';
import { updateUserSubscription, getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    let session = await getServerSession(authOptions);
    if (!session) {
      const headersList = request.headers;
      const userId = headersList.get('x-user-id');
      if (userId) {
        session = { user: { id: userId } };
      }
    }
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      amount,
      currency
    } = await request.json();

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const plan = planId ? SUBSCRIPTION_PLANS[planId] : null;
    const startDate = new Date();
    const endDate = new Date();
    if (plan) {
      endDate.setDate(startDate.getDate() + plan.duration);
    }

    // Update user subscription
    const subscriptionData = {
      status: 'completed',
      plan: planId || 'one-time',
      planName: plan?.name || 'One-time purchase',
      startDate,
      endDate: plan ? endDate : null,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: plan?.amount || amount,
      currency: plan?.currency || currency || 'INR'
    };

    await updateUserSubscription(session.user.id, subscriptionData);

    // Store transaction record
    const db = await getDatabase();
    const transactions = db.collection('transactions');
    await transactions.insertOne({
      userId: new ObjectId(session.user.id),
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: plan?.amount || amount,
      currency: plan?.currency || currency || 'INR',
      planId: planId || null,
      status: 'completed',
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
