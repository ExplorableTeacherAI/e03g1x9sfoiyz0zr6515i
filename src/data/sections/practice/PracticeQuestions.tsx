import { useState, type ReactNode } from "react";
import {
    Button,
    Input,
    RadioGroup,
    RadioGroupItem,
    Label,
} from "@/components/atoms";

export interface PracticeChoice {
    id: string;
    label: ReactNode;
    correct?: boolean;
    /** Shown when this option is chosen */
    feedback: ReactNode;
}

export interface PracticeItem {
    id: string;
    prompt: ReactNode;
    /** Multiple choice options — omit for a typed numeric answer */
    choices?: PracticeChoice[];
    /** Expected numeric answer (used when `choices` is omitted) */
    answer?: number;
    tolerance?: number;
    correctFeedback: ReactNode;
    /** Progressive nudges for a typed answer: first attempt, second, then the last resort */
    hints?: ReactNode[];
}

interface QuestionState {
    value: string;
    attempts: number;
    checked: boolean;
}

const emptyState: QuestionState = { value: "", attempts: 0, checked: false };

const FeedbackPanel = ({
    correct,
    children,
}: {
    correct: boolean;
    children: ReactNode;
}) => (
    <div
        className={`mt-3 rounded-md border px-3 py-2 text-sm ${
            correct
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-amber-300 bg-amber-50 text-amber-900"
        }`}
    >
        {children}
    </div>
);

const SingleQuestion = ({ item, index }: { item: PracticeItem; index: number }) => {
    const [state, setState] = useState<QuestionState>(emptyState);

    const chosen = item.choices?.find((choice) => choice.id === state.value);
    const isCorrect = item.choices
        ? Boolean(chosen?.correct)
        : Math.abs(Number(state.value) - (item.answer ?? 0)) <=
          (item.tolerance ?? 0.001) && state.value.trim() !== "";

    const hint =
        item.hints && item.hints.length > 0
            ? item.hints[Math.min(state.attempts - 1, item.hints.length - 1)]
            : "Go back to the graphs above and read the value off directly.";

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-slate-500">
                Question {index + 1}
            </div>
            <div className="mb-3 text-slate-800">{item.prompt}</div>

            {item.choices ? (
                <RadioGroup
                    value={state.value}
                    onValueChange={(value) =>
                        setState((previous) => ({ ...previous, value, checked: false }))
                    }
                    className="space-y-2"
                >
                    {item.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center gap-2">
                            <RadioGroupItem
                                value={choice.id}
                                id={`${item.id}-${choice.id}`}
                            />
                            <Label
                                htmlFor={`${item.id}-${choice.id}`}
                                className="cursor-pointer font-normal text-slate-700"
                            >
                                {choice.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <Input
                    value={state.value}
                    onChange={(event) =>
                        setState((previous) => ({
                            ...previous,
                            value: event.target.value,
                            checked: false,
                        }))
                    }
                    className="w-40"
                    placeholder="Your answer"
                />
            )}

            <Button
                className="mt-3"
                variant="outline"
                onClick={() =>
                    setState((previous) => ({
                        ...previous,
                        checked: true,
                        attempts: previous.attempts + 1,
                    }))
                }
                disabled={state.value.trim() === ""}
            >
                Check
            </Button>

            {state.checked && (
                <FeedbackPanel correct={isCorrect}>
                    {isCorrect
                        ? item.correctFeedback
                        : (chosen?.feedback ?? hint)}
                </FeedbackPanel>
            )}
        </div>
    );
};

export const PracticeQuestions = ({ items }: { items: PracticeItem[] }) => (
    <div className="space-y-4">
        {items.map((item, index) => (
            <SingleQuestion key={item.id} item={item} index={index} />
        ))}
    </div>
);

export default PracticeQuestions;
