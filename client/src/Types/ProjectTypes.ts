export interface PhoneDrawerProps {
  isDrawerOpen: boolean;
  setisDrawerOpen: (value: boolean) => void;
  user?: User | null;
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