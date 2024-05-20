const LoadingState = () => {
  return (
    <div
      className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-700 border-r-transparent bg-inherit align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:animate-[spin_1.5s_linear_infinite] dark:border-solid dark:border-white dark:border-r-transparent dark:bg-inherit'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  )
}

export default LoadingState
