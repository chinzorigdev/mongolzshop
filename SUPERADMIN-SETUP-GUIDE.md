# Mongolz Shop Superadmin Setup Guide

This guide explains how to set up and use the superadmin functionality for the Mongolz Shop web application.

## Initial Superadmin Setup

When you first deploy the application, you need to create a superadmin account:

1. Access the init-superadmin page: `http://your-domain/init-superadmin`
2. You'll need the secret key that's defined in your `.env` file as `SEED_SECRET_KEY`
3. Enter the secret key and create the initial superadmin
4. The system will create a superadmin account with:
   - Email: superadmin@mongolz.shop
   - Password: ChangeThisPassword123!

**IMPORTANT**: After the initial setup, immediately log in and change the default password!

## Superadmin Capabilities

As a superadmin, you can:

1. Create, edit, and delete admin users
2. Change passwords for admin users
3. Access all parts of the admin interface
4. Manage system-wide settings

## Troubleshooting Login Issues

If you're experiencing redirect loops or ERR_TOO_MANY_REDIRECTS error when accessing the admin login page:

1. Clear your browser cookies for the site
2. Make sure the middleware.ts file correctly allows access to:
   - /admin/login
   - /init-superadmin

## Security Considerations

1. Always change the default superadmin password immediately after setup
2. Use strong, unique passwords for all admin accounts
3. Consider implementing additional security measures:
   - Two-factor authentication
   - IP restrictions for admin access
   - Regular password rotation

## Technical Implementation

The superadmin functionality uses:

1. Role-based authentication with JWT tokens
2. MongoDB for user data storage
3. Next.js middleware for route protection
4. Server-side API routes for data operations

For any issues or questions, refer to the internal documentation or contact the development team.
