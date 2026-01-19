
type BannerProps = {
  imageUrl: string;
};


export const BannerDiv: React.FC<BannerProps> = ({imageUrl}) => {
  return (
    <section className="h-[700px] bg-cover bg-top bg-no-repeat mb-24"
     style={{ backgroundImage: `url(${imageUrl})` }}>
    </section>
  )
}


