import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";

export const puttingTheSketchTogetherBlocks: ReactElement[] = [
    <StackLayout key="layout-conclusion-heading" maxWidth="xl">
        <Block id="conclusion-heading" padding="md">
            <EditableH2 id="h2-conclusion-heading" blockId="conclusion-heading">
                Putting the Sketch Together
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-conclusion-summary" maxWidth="xl">
        <Block id="conclusion-summary" padding="sm">
            <EditableParagraph id="para-conclusion-summary" blockId="conclusion-summary">
                So the sketch was never guesswork. You found where the curve sits at{" "}
                <InlineFormula latex="x = 0" />, where it heads as{" "}
                <InlineFormula latex="x" /> runs off to{" "}
                <InlineFormula latex="\pm\infty" />, where a zero denominator breaks it,
                where its gradient is zero, and where its bending changes direction. The
                curve is simply the one shape that fits all of those facts at once.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-conclusion-forward" maxWidth="xl">
        <Block id="conclusion-forward" padding="sm">
            <EditableParagraph id="para-conclusion-forward" blockId="conclusion-forward">
                Two habits are worth carrying with you: a zero derivative is only a
                candidate until you check the sign on both sides of it, and the denominator
                tells you as much as the numerator. The same routine works on any function
                you can differentiate. Next you will use it in optimisation, where the
                turning point you have just learned to find is the answer itself — the
                largest volume, the shortest distance, the lowest cost.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
