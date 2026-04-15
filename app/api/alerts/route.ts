import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getAlertsByUserId, createAlert, markAlertAsRead, deleteAlert } from '@/lib/supabase';
import { Alert, CreateAlertRequest, ApiResponse } from '@/lib/types';

// GET user alerts
export async function GET(request: NextRequest) {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - no active session',
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    const alerts = await getAlertsByUserId(session.user.id);

    return NextResponse.json(
      {
        success: true,
        data: alerts,
      } as ApiResponse<Alert[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get alerts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// POST create new alert
export async function POST(request: NextRequest) {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - no active session',
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    const body: CreateAlertRequest = await request.json();

    // Validation
    if (!body.alert_type || !body.title) {
      return NextResponse.json(
        {
          success: false,
          error: 'alert_type and title are required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const newAlert = await createAlert({
      user_id: session.user.id,
      ...body,
    });

    return NextResponse.json(
      {
        success: true,
        data: newAlert,
        message: 'Alert created successfully',
      } as ApiResponse<Alert>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create alert error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// PUT/PATCH mark alert as read
export async function PATCH(request: NextRequest) {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - no active session',
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    const body = await request.json();
    const { alert_id, action } = body;

    if (!alert_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'alert_id is required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    if (action === 'mark_read') {
      const updatedAlert = await markAlertAsRead(alert_id);
      return NextResponse.json(
        {
          success: true,
          data: updatedAlert,
        } as ApiResponse<Alert>,
        { status: 200 }
      );
    } else if (action === 'delete') {
      const deletedAlert = await deleteAlert(alert_id);
      return NextResponse.json(
        {
          success: true,
          message: 'Alert deleted successfully',
        } as ApiResponse<null>,
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      } as ApiResponse<null>,
      { status: 400 }
    );
  } catch (error) {
    console.error('Update alert error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// DELETE alert (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - no active session',
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const alertId = searchParams.get('id');

    if (!alertId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Alert id is required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    await deleteAlert(alertId);

    return NextResponse.json(
      {
        success: true,
        message: 'Alert deleted successfully',
      } as ApiResponse<null>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete alert error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
