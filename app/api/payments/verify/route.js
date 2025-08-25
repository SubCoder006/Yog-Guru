// app/api/payments/verify/route.js
import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';

export async function POST(request) {
  try {
    console.log('🔍 Payment verification started');
    
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      planId 
    } = body;

    console.log('📋 Verification data:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      planId
    });

    // Verify signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error('❌ Invalid payment signature');
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    console.log('✅ Payment signature verified');

    // Here you would typically:
    // 1. Update user subscription in database
    // 2. Send confirmation email
    // 3. Log the transaction

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('💥 Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
