type Props = {
  status: 'success' | 'error';
  errorMessage: string;
  onReturn: () => void;
};

function SubmissionStatus({ status, errorMessage, onReturn }: Props) {
  const isSuccess = status === 'success';

  return (
    <section
      className="mx-auto max-w-[500px] py-[clamp(28px,5vw,58px)] text-center"
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      aria-atomic="true"
    >
      <div
        className={`mx-auto mb-[22px] grid h-[60px] w-[60px] place-items-center rounded-full text-[27px] text-white ${isSuccess ? 'bg-accent' : 'bg-ink'}`}
        aria-hidden="true"
      >
        {isSuccess ? '✓' : '!'}
      </div>
      <p className="mb-[10px] text-xs font-bold uppercase tracking-[.13em] text-accent">
        {isSuccess ? 'Заявка отправлена' : 'Не удалось отправить'}
      </p>
      <h2 className="font-display text-[clamp(30px,4vw,42px)] font-semibold leading-[1.05] tracking-[-.04em]">
        {isSuccess ? 'Данные переданы' : 'Попробуйте ещё раз'}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.65] text-muted">
        {isSuccess
          ? 'Заявка передана организаторам восхождения. Скоро с вами свяжутся!'
          : errorMessage ||
            'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.'}
      </p>
      {!isSuccess && (
        <button
          className="mt-6 min-h-12 cursor-pointer rounded-[2px] border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          type="button"
          onClick={onReturn}
        >
          Вернуться к форме
        </button>
      )}
    </section>
  );
}

export default SubmissionStatus;
