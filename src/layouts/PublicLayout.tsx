type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return <div className="grid place-items-center h-dvh m-0">{children}</div>;
};

export default PublicLayout;
