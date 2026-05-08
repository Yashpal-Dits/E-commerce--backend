export const Messages = {
// Authorization Messages 
    AUTH: {
        RESISTER_SUCCESS: "User resgistered successfully",
        LOGIN_SUCCESS: "Login successful",
        LOGOUT_SUCCESS: "Logged out successfully",
        PROFILE_RETRIEVED: "Profile retrieved successfully",
        PROFILE_UPDATED: "Profile updated successfully",
        NO_TOKEN: "No token provided",
        INVALID_TOKEN: "Invalid or expired token",
        USER_NOT_AUTHENTICATED: "User not authenticated",
        INVALID_CREDENTIALS: "Invalid email or password",
        EMAIL_ALREADY_REGISTERED: "Email already registered",
        EMAIL_ALREADY_IN_USE: "Email already in use",
        USER_NOT_FOUND: "User not found",
        MISSING_REQUIRED_FIELDS: "Missing required fields",
    },
     // Category Messages
    CATEGORY: {
        CREATED: "Category created successfully",
        RETRIEVED: "Category retrieved successfully",
        RETRIEVED_ALL: "Categories retrieved successfully",
        UPDATED: "Category updated successfully",
        DELETED: "Category deleted successfully",
        NOT_FOUND: "Category not found",
        ALREADY_EXISTS: "A category with this name already exists",
        AT_LEAST_ONE_FIELD: "At least one field is required",
    },
     VALIDATION: {
   INVALID_EMAIL: "Invalid email format",
   INVALID_ID: "Invalid ID parameter",
   INVALID_PASSWORD: "Password must be at least 6 characters",
   REQUIRED_FIELD: "This field is required",
   AT_LEAST_ONE_FIELD: "At least one field is required",
   INVALID_ROLE: "Role must be either customer or seller",
 },

 // Authorization Messages
 AUTHORIZATION: {
   ADMIN_REQUIRED: "Admin access required",
   SELLER_REQUIRED: "Seller access required",
   CUSTOMER_REQUIRED: "Customer access required",
   ACCESS_DENIED: "Access denied",
 },

 // Common  Messages
 GENERAL: {
   SUCCESS: "Operation completed successfully",
   ERROR: "An error occurred",
   NOT_FOUND: "Resource not found",
   INTERNAL_SERVER_ERROR: "Internal server error",
   BAD_REQUEST: "Bad request",
   UNAUTHORIZED: "Unauthorized",
   FORBIDDEN: "Forbidden",
 },

};

