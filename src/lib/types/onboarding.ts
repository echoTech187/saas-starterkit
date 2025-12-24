export type OnboardingData = {
    // Step 1: Profile
    fullName: string;
    role: string;
    // Step 2: Project
    projectName: string;
    projectDomain: string;
    // Step 3: Team
    teamEmails: string[];
};
