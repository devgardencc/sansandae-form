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
            role="status"
            aria-live="polite"
        >
            <div
                className={`mx-auto mb-[22px] grid h-[58px] w-[58px] place-items-center rounded-full text-[27px] text-white ${isSuccess ? 'bg-[#d73428]' : 'bg-[#171715]'}`}
                aria-hidden="true"
            >
                {isSuccess ? '✓' : '!'}
            </div>
            <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[.13em] text-[#d73428]">
                {isSuccess ? 'Заявка отправлена' : 'Не удалось отправить'}
            </p>
            <h2 className="font-display text-[clamp(30px,4vw,42px)] font-semibold leading-[1.05] tracking-[-.04em]">
                {isSuccess ? 'Данные переданы' : 'Попробуйте ещё раз'}
            </h2>
            <p className="mt-[14px] text-sm leading-[1.6] text-[#77736b]">
                {isSuccess
                    ? 'Заявка передана организаторам восхождения. Скоро с вами свяжутся!'
                    : errorMessage ||
                      'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.'}
            </p>
            {!isSuccess && (
                <button
                    className="mt-[25px] min-h-12 cursor-pointer border border-[#d9d3c8] bg-transparent px-5 text-xs font-semibold text-[#171715] hover:border-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171715]"
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
