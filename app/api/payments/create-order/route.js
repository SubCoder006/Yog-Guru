// app/api/payments/create-order/route.js
import { NextResponse } from 'next/server';
import { createRazorpayOrder, SUBSCRIPTION_PLANS } from '@/lib/razorpay';

export async function POST(request) {
  try {
    console.log('🔥 Create order API called');
    
    // Parse request body
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { planId, customAmount, description } = body;
    
    // Get user ID from headers
    const userId = request.headers.get('x-user-id');
    console.log('👤 User ID:', userId);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    let amount, planDetails;

    // Handle custom amount or plan-based amount
    if (customAmount) {
      amount = customAmount;
      planDetails = { name: description || 'Custom Payment' };
    } else if (planId) {
      // Find plan in SUBSCRIPTION_PLANS
      planDetails = SUBSCRIPTION_PLANS[planId] || 
                   Object.values(SUBSCRIPTION_PLANS).find(plan => plan.id === planId);
      
      if (!planDetails) {
        console.error('❌ Invalid plan ID:', planId);
        console.log('📋 Available plans:', Object.keys(SUBSCRIPTION_PLANS));
        return NextResponse.json(
          { error: 'Invalid plan selected' },
          { status: 400 }
        );
      }
      
      amount = planDetails.amount;
    } else {
      return NextResponse.json(
        { error: 'Plan ID or custom amount required' },
        { status: 400 }
      );
    }

    console.log('💰 Amount:', amount, 'Plan:', planDetails?.name);

    // Create Razorpay order
    const receipt = `order_${userId}_${Date.now()}`;
    const order = await createRazorpayOrder(amount, 'INR', receipt);
    
    console.log('✅ Razorpay order created:', order.id);

    // Return order details
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      description: planDetails?.name || description || 'Yog-Guru Payment'
    });

  } catch (error) {
    console.error('💥 Create order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
