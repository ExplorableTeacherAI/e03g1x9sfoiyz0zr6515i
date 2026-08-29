import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

import { drawingGraphsIntroductionBlocks } from "./sections/DrawingGraphsIntroduction";
import { findingTurningPointsBlocks } from "./sections/FindingTurningPoints";
import { framingTheCurveBlocks } from "./sections/FramingTheCurve";
import { readingTheSignBlocks } from "./sections/ReadingTheSign";
import { howTheCurveBendsBlocks } from "./sections/HowTheCurveBends";
import { puttingTheSketchTogetherBlocks } from "./sections/PuttingTheSketchTogether";

export const blocks: ReactElement[] = [
    ...drawingGraphsIntroductionBlocks,
    ...findingTurningPointsBlocks,
    ...framingTheCurveBlocks,
    ...readingTheSignBlocks,
    ...howTheCurveBendsBlocks,
    ...puttingTheSketchTogetherBlocks,
];
