# Vendor Registration Form - Hindustan Copper Limited

A complete single-page application for vendor registration with real-time validation, responsive design, and full API integration.

## 🚀 Features

- **📄 Exact UI/UX Match**: Pixel-perfect recreation of the original government form design
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices  
- **🚀 SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support
- **✅ Real-time Validation**: Client-side validation with instant feedback
- **♿ Accessibility**: WCAG compliant with keyboard navigation support
- **🔐 Dynamic Captcha**: Math-based CAPTCHA with auto-rotation
- **🎨 Professional Styling**: Government enterprise color scheme and typography
- **⚡ Vanilla JavaScript**: Pure JavaScript, no frameworks required
- **🔗 Direct API Integration**: Clean API calls to your existing backend
- **⚠️ Error Handling**: User-friendly error messages with console logging

## 📁 Project Structure

```
misc/
├── index.html    # Main HTML structure and embedded CSS
├── script.js     # JavaScript functionality and API integration  
└── README.md     # This documentation file
```

## 🛠️ Setup & Installation

### Frontend Setup
1. **Open the form**: Double-click `index.html` to open in your browser
2. **Configure API endpoint**: Update the backend URL in `script.js` if needed:
   ```javascript
   const API_CONFIG = {
       baseUrl: 'http://localhost:9000', // Your backend URL
       endpoint: '/vendor-details'
   };
   ```
3. **Ensure your backend** has the route: `POST /vendor-details` and is running on port 9000
4. **Test the form**: Fill out and submit to test the API connection

## 🔧 API Documentation

### Endpoint
```
POST /vendor-details
Content-Type: application/json
```

### Request Format
```json
{
  "gst_details": {
    "firm_name": "string (required)",
    "firm_type": "string (required)",
    "country": "string (required)",
    "gst_number": "string (required, GST format)",
    "company_status": "string (required)"
  },
  "pan_details": {
    "pan_number": "string (required, PAN format)"
  },
  "address": "string (required)",
  "std_code_with_phone": "string (required)",
  "contact_person_name": "string (required)",
  "items_interested": ["string"] (required, array),
  "city": "string (optional)",
  "fax": "string (optional)",
  "contact_person_designation": "string (required)",
  "state": "string (required)",
  "website": "string (optional)",
  "is_msme": "string (required)",
  "country": "string (required)",
  "mobile": "string (required)",
  "business_description": "string (optional)",
  "pin": "string (required, 6-digit)",
  "email": "string (required, email format)",
  "submitted_at": "ISO 8601 timestamp",
  "form_version": "1.0"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Vendor registration submitted successfully. You will receive a confirmation email shortly.",
  "vendorId": "VEN123456ABCD",
  "submissionId": "SUB789012EFGH",
  "status": "pending_review"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "fieldName": "Error message"
  }
}
```

## ✅ Form Validation

### Client-Side Validation
- **Required Fields**: All mandatory fields checked before submission
- **Format Validation**: GST, PAN, email, phone, PIN code format validation
- **Real-time Feedback**: Instant validation on field blur
- **Visual Indicators**: Red borders and error messages for invalid fields
- **Captcha Verification**: Math-based CAPTCHA validation

### Server-Side Validation
- **Duplicate Validation**: Server-side format checking
- **Business Logic**: Additional validation rules
- **Sanitization**: Input cleaning and security checks
- **Error Mapping**: Field-specific error messages

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (Multi-column layout)
- **Tablet**: 768px-1199px (Adaptive grid)
- **Mobile**: <768px (Single column, touch-optimized)

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized multi-select dropdown
- Readable font sizes
- Easy form navigation

## 🔐 Security Features

- Input sanitization
- CSRF protection ready
- SQL injection prevention
- XSS protection
- Timeout handling
- Rate limiting ready

## 🎨 Customization

### Color Scheme
The application uses Hindustan Copper Limited's brand colors:
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#B8860B` (Dark Goldenrod)
- Background: `#F3DFC5` (Light Cream)

### Modifying Styles
Edit the `<style>` section in `index.html` to customize:
- Colors and branding
- Layout and spacing
- Typography
- Responsive breakpoints

### API Configuration
Modify `API_CONFIG` in `script.js`:
```javascript
const API_CONFIG = {
    baseUrl: 'http://localhost:9000', // Change for your backend URL
    endpoint: '/vendor-details'
};
```

## 🔄 Backend Requirements

Your backend should implement:

### Required Endpoint
- **Route**: `POST /vendor-details`
- **Content-Type**: `application/json`
- **Port**: 9000 (or update `script.js` accordingly)

### Expected Response Format
```json
// Success Response
{
  "success": true,
  "message": "Vendor registration submitted successfully",
  "vendorId": "VEN123456"
}

// Error Response  
{
  "success": false,
  "message": "Error message"
}
```

## 🎯 Usage

1. **Open** `index.html` in your browser
2. **Fill out** the vendor registration form  
3. **Submit** to send data to your backend at `/vendor-details`
4. **Check console** for API call logs and debugging info

That's it! Pure frontend form with direct API integration.

## 📱 Browser Support

- Chrome 60+
- Firefox 55+  
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Frontend-only implementation** - Just open `index.html` and connect to your existing backend!