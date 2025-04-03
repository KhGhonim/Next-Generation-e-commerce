export interface PhoneDrawerProps {
  isDrawerOpen: boolean;
  setisDrawerOpen: (value: boolean) => void;
}

export interface PcHeaderProps {
  IsScrolled: boolean;
}

export interface PhoneHeaderProps {
  IsScrolled: boolean;
}

export interface CardProps {
  cards: {
    id: number;
    title: string;
    link: string;
    image: string;
    price: number;
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
  setSelectedSize: (size: string) => void;
}

export interface WebsiteLoadingProps {
  isLoading: boolean;
}
export interface ImagesProps {
  handleNextImage: () => void,
  handlePrevImage: () => void,
  currentImageIndex: number,
  setCurrentImageIndex: (index: number) => void
}
export interface BigImageProps {
  handleNextImage: () => void,
  handlePrevImage: () => void,
  currentImageIndex: number,
}
export interface SmallImagesProps {
  currentImageIndex: number,
  setCurrentImageIndex: (index: number) => void
}