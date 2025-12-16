
type BannerProps = {
  imageUrl: string;
};


export const BannerDiv: React.FC<BannerProps> = ({imageUrl}) => {
  return (
    <section className="h-[50vh] bg-cover bg-center bg-no-repeat rounded-t-4xl"
     style={{ backgroundImage: `url(${imageUrl})` }}>
    </section>
  )
}


