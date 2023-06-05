const About = () => {
  return (
    <div className="w-96 m-0 flex flex-col items-center pb-2">
      <h1 className="text-lg font-bold mb-3">About this project</h1>
      <p className="mb-3">
        This app takes credit card information, then sends it to a backend API
        for validation. The backend responds with either success or failure.
      </p>
      <p className="mb-3">Jose Lo</p>
    </div>
  );
};

export default About;
