import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

export const framingTheCurveBlocks: ReactElement[] = [
    <StackLayout key="layout-framing-heading" maxWidth="xl">
        <Block id="framing-heading" padding="md">
            <EditableH2 id="h2-framing-heading" blockId="framing-heading">
                Framing the Curve
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-intercept" maxWidth="xl">
        <Block id="framing-intercept" padding="sm">
            <EditableParagraph id="para-framing-intercept" blockId="framing-intercept">
                Before drawing anything, pin down the edges of the picture. Start with{" "}
                <InlineFormula latex="x = 0" />: the example gives{" "}
                <InlineFormula latex="y = 0" />, so the curve passes through the origin.
                That is one point you know for certain.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-limits" maxWidth="xl">
        <Block id="framing-limits" padding="sm">
            <EditableParagraph id="para-framing-limits" blockId="framing-limits">
                Next ask what happens far out. Divide the top and bottom by{" "}
                <InlineFormula latex="x^2" />: the top shrinks towards zero while the
                bottom heads to 1.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-limit-formula" maxWidth="xl">
        <Block id="framing-limit-formula" padding="lg">
            <FormulaBlock latex="\lim_{x \to +\infty} \frac{2x}{1 + x^2} = 0, \qquad \lim_{x \to -\infty} \frac{2x}{1 + x^2} = 0" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-asymptotes" maxWidth="xl">
        <Block id="framing-asymptotes" padding="sm">
            <EditableParagraph id="para-framing-asymptotes" blockId="framing-asymptotes">
                Now the step that gets skipped most often: set the denominator to zero. A
                vertical asymptote sits wherever the bottom of the fraction vanishes, and
                missing one ruins the whole sketch. Here <InlineFormula latex="1 + x^2 = 0" />{" "}
                has no real solution, so this curve has none. Change the function to{" "}
                <InlineFormula latex="y = \frac{2x}{1 - x^2}" /> and the bottom vanishes at{" "}
                <InlineFormula latex="x = 1" /> and <InlineFormula latex="x = -1" /> — two
                lines the curve can never cross.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-visual" maxWidth="xl">
        <Block id="framing-visual" padding="sm">
            <VisualOptionCards
                blockId="framing-visual"
                intro="Pick how your students will see what frames a curve."
                cards={[
                    {
                        id: "denominator-switch",
                        title: "Two functions side by side: one with a zero denominator, one without",
                        looks: "Two graphs shown together, one for each function, with dashed vertical lines drawn wherever the denominator hits zero.",
                        manipulate: "Switch between the two functions and watch the dashed lines appear and disappear.",
                        reveals: "A zero denominator creates a vertical wall the curve races towards but never touches.",
                        targetsMisconception: "Students ignore where the denominator is zero, so they miss asymptotes",
                        recommended: true,
                    },
                    {
                        id: "zoom-out",
                        title: "A zoom control that pulls the view out to very large x values",
                        looks: "The curve on axes with a zoom slider, and the current y value displayed as a number.",
                        manipulate: "Zoom out and watch the number shrink towards zero.",
                        reveals: "Far from the origin the curve flattens onto the x-axis instead of running away.",
                    },
                    {
                        id: "value-table",
                        title: "A table of y values as x is pushed further and further out",
                        looks: "A table of x and y pairs for growing x, with the curve drawn beside it.",
                        manipulate: "Add larger and larger x values to the table.",
                        reveals: "The y values close in on a single number, which is the horizontal asymptote.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
