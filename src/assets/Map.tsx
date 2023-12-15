import { Layout, Node, NodeProps, Rect, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, createRefArray, easeInOutCubic, sequence, tween } from "@motion-canvas/core";

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

    private readonly rects = createRefArray<Rect>()

    private isShown: boolean
    constructor(props?: MapProps) {
        super({
            ...props
        })

        this.isShown = this.showTiles()

        this.add(

            <>

                <Layout layout direction={"column"} gap={2} width={() => this.tileSize() * this.mapArray()[0].length} height={() => this.tileSize() * this.mapArray().length}>
                    {this.mapArray().map((rows) => (
                        <Layout direction={"row"} gap={2} width={"100%"} height={"100%"}>
                            {rows.map((column) => (
                                <Rect
                                    ref={this.rects}
                                    radius={3}
                                    fill={column === 0 ? "black" : "red"}
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


}