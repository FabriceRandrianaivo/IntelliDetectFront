interface HeadingProps {
    title: string;
  }
  
  const HeadSection: React.FC<HeadingProps> = ({ title }) => {
    return (
      <div className="b-heading">
        <h1>{title}</h1>
      </div>
    );
  };
  
  export default HeadSection;
  