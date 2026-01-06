/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType image */
  featuredImage?: string;
}


/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image */
  cardImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  keyResults?: string;
  /** @wixFieldType text */
  approach?: string;
  /** @wixFieldType text */
  outcomes?: string;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: pricingplans
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType text */
  planDescription?: string;
  /** @wixFieldType number */
  monthlyPrice?: number;
  /** @wixFieldType text */
  featuresSummary?: string;
  /** @wixFieldType number */
  whatsAppMessengerAutomationSubscription?: number;
  /** @wixFieldType number */
  whatsAppMessengerAutomationSetup?: number;
  /** @wixFieldType number */
  linkedInViralPostAutomation?: number;
  /** @wixFieldType number */
  commentBotPrice?: number;
  /** @wixFieldType number */
  websiteChatbotPrice?: number;
  /** @wixFieldType text */
  customAutomationNote?: string;
  /** @wixFieldType boolean */
  isRecommended?: boolean;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType image */
  cardImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  faqQuestion1?: string;
  /** @wixFieldType text */
  faqAnswer1?: string;
  /** @wixFieldType text */
  faqQuestion2?: string;
  /** @wixFieldType text */
  faqAnswer2?: string;
}


/**
 * Collection ID: solutions
 * Interface for Solutions
 */
export interface Solutions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType image */
  cardImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  memberName?: string;
  /** @wixFieldType image */
  memberPhoto?: string;
  /** @wixFieldType text */
  memberRole?: string;
  /** @wixFieldType text */
  memberBio?: string;
  /** @wixFieldType text */
  memberSpecialties?: string;
  /** @wixFieldType url */
  bookDemoUrl?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType text */
  clientRole?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType image */
  companyLogo?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  testimonialDate?: Date | string;
}
