import { Layout, Node, NodeProps, Rect, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, Vector2, createRefArray, createSignal, easeInOutCubic, sequence, tween } from "@motion-canvas/core";

type MapArray = number[][]

export interface MapProps extends NodeProps {

    tileSize?: SignalValue<number>
    showTiles?: SignalValue<boolean>
    mapArray: SignalValue<MapArray>

}


export class Map extends Node {

    @initial(64)
    @signal()
    public declare readonly tileSize: SimpleSignal<number, this>;

    @initial(true)
    @signal()
    public declare readonly showTiles: SimpleSignal<boolean, this>;

    @signal()
    public declare readonly mapArray: SimpleSignal<MapArray, this>;

    public mapSize = createSignal(() => new Vector2(this.tileSize() * this.mapArray()[0].length, this.tileSize() * this.mapArray().length))

    private readonly rects = createRefArray<Rect>()

    private isShown: boolean
    constructor(props?: MapProps) {
        super({
            ...props
        })

        this.isShown = this.showTiles()

        this.add(

            <>

                <Layout layout direction={"column"} offset={-1} gap={2} width={() => this.tileSize() * this.mapArray()[0].length} height={() => this.tileSize() * this.mapArray().length}>
                    {this.mapArray().map((rows) => (
                        <Layout direction={"row"} gap={2} width={"100%"} height={"100%"}>
                            {rows.map((column) => (
                                <Rect
                                    ref={this.rects}
                                    radius={3}
                                    fill={column === 0 ? "#090909" : "#F64740"}
                                    grow={1}
                                />
                            ))}
                        </Layout>
                    ))}
                </Layout >
            </>

        )


    }

    public * toggleTiles() {

        this.isShown = !this.isShown

        this.rects.forEach(rect => {
            rect.scale(this.isShown ? 0 : 1);
        });

        yield* sequence(0.009, ...this.rects.map((rect) =>
            tween(1, (value) => (
                this.isShown ? rect.scale(easeInOutCubic(value, 0, 1)) : rect.scale(easeInOutCubic(value, 1, 0))
            ))
        ))

    }

    public getDimensionsInTiles(): Vector2 {

        let x = this.mapArray()[0].length
        let y = this.mapArray().length

        return new Vector2(x, y)

    }

    public getCenterCoord(): Vector2 {

        const tileSize = this.tileSize()
        const dimensionsInTiles = this.getDimensionsInTiles()

        let x = dimensionsInTiles.x * tileSize / 2
        let y = dimensionsInTiles.y * tileSize / 2

        return new Vector2(x, y)
    }


}