import { makeScene2D } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import { Map } from "../assets/Map";

export default makeScene2D(function* (view) {

    const mapRef = createRef<Map>()

    view.add(

        <Map
            ref={mapRef}
            tileSize={64}
            mapArray={[

                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            ]}
            showTiles={false}
        />

    )

    yield* mapRef().toggleTiles()


})