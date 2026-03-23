// Cloudflare Pages Function for contact form
// Path: /api/contact

interface ContactFormData {
  name: string;
  email: string;
  role?: string;
  message: string;
  honeypot?: string;
}

interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await request.json();

    // Honeypot spam protection
    if (formData.honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain later
        to: 'andre@hickmann-kuschnereit.de',
        reply_to: formData.email,
        subject: `Neue Kontaktanfrage von ${formData.name}`,
        html: `
          <div style="font-family: 'Space Grotesk', sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f1f1f;">Neue Kontaktanfrage über Portfolio</h2>
            
            <div style="background: #f6f4f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 10px 0;"><strong>E-Mail:</strong> ${formData.email}</p>
              ${formData.role ? `<p style="margin: 0 0 10px 0;"><strong>Position/Firma:</strong> ${formData.role}</p>` : ''}
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #1f1f1f; margin-bottom: 10px;">Nachricht:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            
            <p style="color: #666; font-size: 12px;">
              Diese Nachricht wurde über das Kontaktformular auf hickmann-kuschnereit.de gesendet.
            </p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error('Resend API Error:', error);
      return new Response(
        JSON.stringify({ error: 'Fehler beim Versenden der Nachricht. Bitte versuchen Sie es später erneut.' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Vielen Dank für Ihre Nachricht! Ich melde mich so schnell wie möglich bei Ihnen.' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Ein unerwarteter Fehler ist aufgetreten.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};
