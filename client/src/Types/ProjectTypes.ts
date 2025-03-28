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
