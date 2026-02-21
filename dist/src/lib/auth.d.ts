export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                required: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: true;
        requireEmailVerification: false;
    };
    socialProviders: {
        google: {
            enabled: true;
            clientId: string;
            clientSecret: string;
            prompt: "select_account consent";
            accessType: "offline";
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map