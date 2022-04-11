import {CSSProperties} from "react";

export const FlexStyle: CSSProperties = {display: 'flex'};
export const FlexColumn: CSSProperties = {...FlexStyle, flexFlow: 'column'};

export const FlexAlignCenter: CSSProperties = {...FlexStyle, alignItems: 'center'};
export const FlexColumnAlignCenter: CSSProperties = {...FlexColumn, alignItems: 'center'};

export const FlexCenterCenter: CSSProperties = {...FlexAlignCenter, justifyContent: 'center'};
export const FlexColumnCenterCenter: CSSProperties = {...FlexColumnAlignCenter, justifyContent: 'center'};

export const FlexAlignCenterSpaceAround: CSSProperties = {...FlexAlignCenter, justifyContent: 'space-around'};
export const FlexColumnAlignCenterSpaceAround: CSSProperties = {
    ...FlexColumnAlignCenter,
    justifyContent: 'space-around'
};

export const FlexAlignCenterSpaceAroundWrap: CSSProperties = {
    ...FlexAlignCenterSpaceAround,
    flexWrap: 'wrap'
};
export const FlexColumnAlignCenterSpaceAroundWrap: CSSProperties = {
    ...FlexColumnAlignCenterSpaceAround,
    flexWrap: 'wrap'
};
