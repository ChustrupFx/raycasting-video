import { Node, makeScene2D } from "@motion-canvas/2d";
import { Vector2, createRef, createSignal } from "@motion-canvas/core";
import { Map, MapProps } from "../assets/Map";
import { Player } from "../assets/Player";

export default makeScene2D(function* (view) {

    const mapRef = createRef<Map>()
    const playerRef = createRef<Player>()
    const mapSettings: MapProps = {
        tileSize: 64,
        mapArray: [

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

        ],
        showTiles: true
    }

    let cameraOffset = createSignal(Vector2.zero)
    const length = createSignal<number>(80)

    const group = createRef<Node>()

    view.fill("#C0BCB5")

    view.add(

        <Node ref={group}>
            <Map
                ref={mapRef}
                {...mapSettings}
            />

            <Player
                ref={playerRef}
                position={mapRef().getCenterCoord()}
                mapSettings={mapSettings}
                directionNodeLength={100}

            />
        </Node>
    )

    group().position(mapRef().mapSize().div(-2))

    yield* playerRef().rotate(150, 2)

})