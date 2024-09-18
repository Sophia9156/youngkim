module "*.module.scss";

type CategoryUnion =
  | "intro"
  | "paintings"
  | "photographs"
  | "drawings"
  | "contact";

type GalleryUnit = {
  id: React.Key;
  image: string;
  imagePath: string;
  title?: string | null;
  description?: string | null;
};

type OrderType = React.Key[];

type ContactUnit = {
  id: React.Key;
  image: string;
  imagePath: string;
};

type PAINTINGLIST = {
  intro: GalleryUnit;
  paintings: GalleryUnit[];
  paintingsOrder: OrderType;
};
