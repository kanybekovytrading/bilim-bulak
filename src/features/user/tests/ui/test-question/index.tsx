import type { TestQuestionItem } from "@/entities/user/tests/model/types";

interface Props {
  question: TestQuestionItem;
  selectedAnswerId?: number;
  onSelect: (answerId: number) => void;
}

export const TestQuestion = ({
  question,
  selectedAnswerId,
  onSelect,
}: Props) => (
  <>
    <h2 className="font-semibold text-xl md:text-3xl mt-5 md:mt-10 text-center">
      {question.text}
    </h2>

    <div
      key={question.id}
      style={{
        width: "100%",
        marginTop: 20,
        display: "grid",
        gap: 12,
        animation: "fadeInUp 180ms ease-out",
      }}
    >
      {question.answers.map((ans) => {
        const isSelected = ans.id === selectedAnswerId;

        return (
          <button
            key={ans.id}
            type="button"
            onClick={() => onSelect(ans.id)}
            className="px-4 py-3"
            style={{
              width: "100%",
              borderRadius: 16,
              background: isSelected ? "rgba(21,112,239,0.08)" : "#fff",
              border: `2px solid ${isSelected ? "#1570EF" : "#E5E7EB"}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 150ms ease",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                border: `2px solid ${isSelected ? "#1570EF" : "#D1D5DB"}`,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              {isSelected ? (
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#1570EF",
                  }}
                />
              ) : null}
            </span>

            <span className="font-medium text-xl text-neutral-700">
              {ans.text}
            </span>
          </button>
        );
      })}
    </div>

    <style jsx>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </>
);
