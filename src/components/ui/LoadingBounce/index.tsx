const LoadingBounce = () => {
  return (
    <div className="flex gap-1 justify-center py-2">
      <div className="w-2 h-2 bg-main-gray rounded-full animate-bounce duration-700 delay-0" />
      <div className="w-2 h-2 bg-main-gray rounded-full animate-bounce duration-700 delay-300" />
      <div className="w-2 h-2 bg-main-gray rounded-full animate-bounce duration-700 delay-500" />
    </div>
  );
};

export default LoadingBounce;
