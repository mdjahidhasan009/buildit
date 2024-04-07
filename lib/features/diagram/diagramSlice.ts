import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fileName: "",
    editorData: {},
    // editorData: {
    //     "blocks": [
    //         {
    //             "id": "Sm1g4CQ__x",
    //             "type": "header",
    //             "data": {
    //                 "text": "This is a heading",
    //                 "level": 2
    //             }
    //         },
    //         {
    //             "id": "Iaxxn44C7X",
    //             "type": "paragraph",
    //             "data": {
    //                 "text": "This is a paragraph"
    //             }
    //         }
    //     ],
    //     "version": "2.29.1"
    // },
    diagramData: {
        elements: []
    },
    // diagramData: {
    //     elements: [
    //         {
    //             "type": "diamond",
    //             "version": 11,
    //             "versionNonce": 1616686471,
    //             "isDeleted": false,
    //             "id": "kIewyTiZPow-SoZBXG24e",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "angle": 0,
    //             "x": 100.5,
    //             "y": 112,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "width": 64,
    //             "height": 101,
    //             "seed": 520456775,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": {
    //                 "type": 2
    //             },
    //             "boundElements": [],
    //             "updated": 1712401725506,
    //             "link": null,
    //             "locked": false
    //         },
    //         {
    //             "type": "rectangle",
    //             "version": 40,
    //             "versionNonce": 853671839,
    //             "isDeleted": false,
    //             "id": "YLfWD1ufMtHdWnoqsnhFG",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "angle": 0,
    //             "x": 84.5,
    //             "y": 96,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "width": 104,
    //             "height": 127,
    //             "seed": 3553223,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": {
    //                 "type": 3
    //             },
    //             "boundElements": [
    //                 {
    //                     "id": "kmqUJupTfshUs1StzBSzh",
    //                     "type": "arrow"
    //                 }
    //             ],
    //             "updated": 1712412426602,
    //             "link": null,
    //             "locked": false
    //         },
    //         {
    //             "id": "6ydQqrzUWPu4FvwC-PGbA",
    //             "type": "ellipse",
    //             "x": 105.5,
    //             "y": 107,
    //             "width": 55,
    //             "height": 61,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": {
    //                 "type": 2
    //             },
    //             "seed": 1108032703,
    //             "version": 37,
    //             "versionNonce": 1030743007,
    //             "isDeleted": false,
    //             "boundElements": [
    //                 {
    //                     "id": "kmqUJupTfshUs1StzBSzh",
    //                     "type": "arrow"
    //                 }
    //             ],
    //             "updated": 1712412426602,
    //             "link": null,
    //             "locked": false
    //         },
    //         {
    //             "id": "pBj4wkNaeIqaqlFpom562",
    //             "type": "arrow",
    //             "x": 232.5,
    //             "y": 91,
    //             "width": 176,
    //             "height": 108,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": {
    //                 "type": 2
    //             },
    //             "seed": 2120984895,
    //             "version": 12,
    //             "versionNonce": 2003367153,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412423951,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     -176,
    //                     108
    //                 ]
    //             ],
    //             "lastCommittedPoint": null,
    //             "startBinding": null,
    //             "endBinding": null,
    //             "startArrowhead": null,
    //             "endArrowhead": "arrow"
    //         },
    //         {
    //             "id": "kmqUJupTfshUs1StzBSzh",
    //             "type": "arrow",
    //             "x": 62.5,
    //             "y": 100,
    //             "width": 143,
    //             "height": 126,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": {
    //                 "type": 2
    //             },
    //             "seed": 1161768657,
    //             "version": 22,
    //             "versionNonce": 2097263089,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412429337,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     143,
    //                     126
    //                 ]
    //             ],
    //             "lastCommittedPoint": null,
    //             "startBinding": {
    //                 "elementId": "YLfWD1ufMtHdWnoqsnhFG",
    //                 "focus": 0.05216695985926754,
    //                 "gap": 22
    //             },
    //             "endBinding": {
    //                 "elementId": "6ydQqrzUWPu4FvwC-PGbA",
    //                 "focus": -0.5509139866077988,
    //                 "gap": 9.715611016509222
    //             },
    //             "startArrowhead": null,
    //             "endArrowhead": "arrow"
    //         },
    //         {
    //             "id": "0py3ioEdiBFItCcxpReYx",
    //             "type": "freedraw",
    //             "x": 177.5,
    //             "y": 68,
    //             "width": 41,
    //             "height": 171,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": null,
    //             "seed": 1822414271,
    //             "version": 14,
    //             "versionNonce": 71878705,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412434537,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     0,
    //                     2
    //                 ],
    //                 [
    //                     -1,
    //                     6
    //                 ],
    //                 [
    //                     -1,
    //                     27
    //                 ],
    //                 [
    //                     -5,
    //                     39
    //                 ],
    //                 [
    //                     -9,
    //                     58
    //                 ],
    //                 [
    //                     -20,
    //                     91
    //                 ],
    //                 [
    //                     -27,
    //                     119
    //                 ],
    //                 [
    //                     -36,
    //                     148
    //                 ],
    //                 [
    //                     -40,
    //                     161
    //                 ],
    //                 [
    //                     -41,
    //                     168
    //                 ],
    //                 [
    //                     -41,
    //                     171
    //                 ],
    //                 [
    //                     -41,
    //                     171
    //                 ]
    //             ],
    //             "pressures": [],
    //             "simulatePressure": true,
    //             "lastCommittedPoint": [
    //                 -41,
    //                 171
    //             ]
    //         },
    //         {
    //             "id": "zC2MVNJmSqETmEHiVvs_T",
    //             "type": "freedraw",
    //             "x": 70.5,
    //             "y": 129,
    //             "width": 140,
    //             "height": 66,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": null,
    //             "seed": 962104191,
    //             "version": 10,
    //             "versionNonce": 313749233,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412440523,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     3,
    //                     3
    //                 ],
    //                 [
    //                     24,
    //                     17
    //                 ],
    //                 [
    //                     53,
    //                     31
    //                 ],
    //                 [
    //                     76,
    //                     43
    //                 ],
    //                 [
    //                     92,
    //                     48
    //                 ],
    //                 [
    //                     121,
    //                     60
    //                 ],
    //                 [
    //                     138,
    //                     65
    //                 ],
    //                 [
    //                     140,
    //                     66
    //                 ]
    //             ],
    //             "pressures": [],
    //             "simulatePressure": true,
    //             "lastCommittedPoint": [
    //                 140,
    //                 66
    //             ]
    //         },
    //         {
    //             "id": "HifgOnWYwSr_ZE1QGw515",
    //             "type": "freedraw",
    //             "x": 205.5,
    //             "y": 151,
    //             "width": 104,
    //             "height": 81,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": null,
    //             "seed": 1202325695,
    //             "version": 15,
    //             "versionNonce": 818804497,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412441521,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     -3,
    //                     3
    //                 ],
    //                 [
    //                     -24,
    //                     19
    //                 ],
    //                 [
    //                     -40,
    //                     33
    //                 ],
    //                 [
    //                     -48,
    //                     41
    //                 ],
    //                 [
    //                     -65,
    //                     52
    //                 ],
    //                 [
    //                     -76,
    //                     59
    //                 ],
    //                 [
    //                     -79,
    //                     62
    //                 ],
    //                 [
    //                     -80,
    //                     62
    //                 ],
    //                 [
    //                     -87,
    //                     68
    //                 ],
    //                 [
    //                     -97,
    //                     74
    //                 ],
    //                 [
    //                     -100,
    //                     78
    //                 ],
    //                 [
    //                     -101,
    //                     79
    //                 ],
    //                 [
    //                     -104,
    //                     81
    //                 ]
    //             ],
    //             "pressures": [],
    //             "simulatePressure": true,
    //             "lastCommittedPoint": [
    //                 -104,
    //                 81
    //             ]
    //         },
    //         {
    //             "id": "s9erCEVliloAoFAjn8q7g",
    //             "type": "freedraw",
    //             "x": 55.5,
    //             "y": 156,
    //             "width": 199,
    //             "height": 4,
    //             "angle": 0,
    //             "strokeColor": "#1e1e1e",
    //             "backgroundColor": "transparent",
    //             "fillStyle": "solid",
    //             "strokeWidth": 2,
    //             "strokeStyle": "solid",
    //             "roughness": 1,
    //             "opacity": 100,
    //             "groupIds": [],
    //             "frameId": null,
    //             "roundness": null,
    //             "seed": 979850911,
    //             "version": 9,
    //             "versionNonce": 2105420785,
    //             "isDeleted": false,
    //             "boundElements": null,
    //             "updated": 1712412443193,
    //             "link": null,
    //             "locked": false,
    //             "points": [
    //                 [
    //                     0,
    //                     0
    //                 ],
    //                 [
    //                     4,
    //                     0
    //                 ],
    //                 [
    //                     22,
    //                     2
    //                 ],
    //                 [
    //                     57,
    //                     4
    //                 ],
    //                 [
    //                     95,
    //                     4
    //                 ],
    //                 [
    //                     156,
    //                     4
    //                 ],
    //                 [
    //                     189,
    //                     4
    //                 ],
    //                 [
    //                     199,
    //                     4
    //                 ]
    //             ],
    //             "pressures": [],
    //             "simulatePressure": true,
    //             "lastCommittedPoint": [
    //                 199,
    //                 4
    //             ]
    //         }
    //     ]
    // },
}

export const diagramSlice = createSlice({
    name: 'diagram',
    initialState,
    reducers: {
        setFileName:(state, action) => {
            const { data } = action.payload;
            state.fileName = data;
        },
        setEditorData:(state, action) => {
            const { data } = action.payload;
            state.editorData = data;
        },
        setDiagramData:(state, action) => {
            const { data } = action.payload;
            const { elements } = data;
            state.diagramData = {
                ...state.diagramData,
                    elements
            };
        }
    }
})

export const { setFileName, setEditorData, setDiagramData } = diagramSlice.actions;
export default diagramSlice.reducer;