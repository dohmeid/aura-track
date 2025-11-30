const TodaysDate = () => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-lg">{date}</p>
    </div>
  );
};

export default TodaysDate;
