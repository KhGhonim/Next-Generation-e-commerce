export interface PhoneDrawerProps {
  isDrawerOpen: boolean;
  setisDrawerOpen: (value: boolean) => void;
  user?: User | null;
}

export interface PaymentMethod {
  _id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolderName: string;
  isDefault: boolean;
  addedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  role?: string;
  paymentMethods?: PaymentMethod[];
  isEmailVerified?: boolean;
}

export interface PcHeaderProps {
  IsScrolled: boolean;
  user: User | null;
}

export interface PhoneHeaderProps {
  user: User | null;
}

export interface CardProps {
  cards: {
    id: number;
    title: string;
    link: string;
    image: string;
    price: number;
    category: string;
    rating: number;
    reviews: number;
    sizes: string[];
    colors: string[];
    description: string;
  }[];
}


export interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface DetailsProps {
  isVibing: boolean;
  addToCart: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedSize: string;
  handleSizeChange: (size: string) => void;
  HandleCopyToClipboard: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface WebsiteLoadingProps {
  IsClose: boolean
}
export interface ImagesProps {
  handleNextImage: () => void,
  handlePrevImage: () => void,
  currentImageIndex: number,
  setCurrentImageIndex: (index: number) => void
  setIsFixed: (value: boolean) => void
}
export interface BigImageProps {
  handleNextImage: () => void,
  handlePrevImage: () => void,
  currentImageIndex: number,
  setIsFixed: (value: boolean) => void
}
export interface SmallImagesProps {
  currentImageIndex: number,
  setCurrentImageIndex: (index: number) => void
}

export interface MegnifierProps{
  setIsFixed: (value: boolean) => void;
  IsFixed: boolean;
  currentImageIndex: number
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  structuredData?: object;
}