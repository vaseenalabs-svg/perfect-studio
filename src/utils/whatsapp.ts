/**
 * WhatsApp Conversion Engine & Analytics Dispatcher
 * Routing every enquiry to +91 70969 90850
 */

export const WHATSAPP_NUMBER = '917096990850';
export const WHATSAPP_DISPLAY = '+91 70969 90850';

export interface WhatsAppPayload {
  message: string;
  sourceScene: string;
  service?: string;
}

export interface BookingFormDetails {
  name: string;
  phone: string;
  eventDate?: string;
  eventType?: string;
  location?: string;
  serviceNeeded?: string;
  message?: string;
}

/**
 * Builds a valid https://wa.me link with URL-encoded text
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Dispatches an analytics event and opens WhatsApp in a new tab
 */
export function triggerWhatsApp({
  message,
  sourceScene,
  service = 'General',
}: WhatsAppPayload): void {
  if (typeof window !== 'undefined') {
    // Dispatch custom event for Google Analytics / GTM
    window.dispatchEvent(
      new CustomEvent('perfect_studio_whatsapp_click', {
        detail: {
          sourceScene,
          service,
          timestamp: new Date().toISOString(),
          number: WHATSAPP_NUMBER,
        },
      })
    );

    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Formats a clean, professional booking message from the form
 */
export function formatBookingMessage(data: BookingFormDetails): string {
  const lines: string[] = [
    '✨ *New Wedding Enquiry — PERFECT STUDIO*',
    '----------------------------------------',
    `👤 *Name:* ${data.name || 'Not provided'}`,
    `📞 *Phone:* ${data.phone || 'Not provided'}`,
  ];

  if (data.eventDate) lines.push(`📅 *Date of Event:* ${data.eventDate}`);
  if (data.eventType) lines.push(`💍 *Celebration Type:* ${data.eventType}`);
  if (data.location) lines.push(`📍 *Location / Destination:* ${data.location}`);
  if (data.serviceNeeded) lines.push(`🎥 *Service Required:* ${data.serviceNeeded}`);
  if (data.message) lines.push(`📝 *Special Note:* ${data.message}`);

  lines.push('----------------------------------------');
  lines.push('Looking forward to discussing your creative vision and availability!');

  return lines.join('\n');
}

/**
 * Helper to build service inquiry text
 */
export function getServiceInquiryMessage(serviceTitle: string): string {
  return `Hello Perfect Studio! I would like to enquire about your *${serviceTitle}* services. Could you please share availability and bespoke package details?`;
}

/**
 * Helper to build package inquiry text
 */
export function getPackageInquiryMessage(packageName: string): string {
  return `Hello Perfect Studio! I am interested in reserving the *${packageName}* for our wedding celebrations. Please guide me through the booking process.`;
}
