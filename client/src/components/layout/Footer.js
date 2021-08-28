const Footer = () => {
  return (
    <div className="bg-gray-900 py-2 flex justify-center items-center text-white">
      <p className="font-black">
        Developed by{' '}
        <a target="_blank" href="https://grizzlybit.dev" rel="noreferrer">
          Grizzlybit
        </a>
      </p>
      <img src="/gb.png" className="ml-2 h-9 inline" alt="Grizzlybit" />
    </div>
  );
};

export default Footer;
