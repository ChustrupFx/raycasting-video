import { Circle, Node, NodeProps, Ray, initial, signal, vector2Signal } from "@motion-canvas/2d";
import { ColorSignal, SignalValue, SimpleSignal, Vector2, Vector2Signal, createRef } from "@motion-canvas/core";
import { MapProps } from "./Map";
import { PlayerPlane } from "./PlayerPlane";

export interface PlayerProps extends NodeProps {

    radius?: SignalValue<number>
    mapSettings: SignalValue<MapProps>
    directionNodeLength?: SignalValue<number>
    direction?: SignalValue<Vector2>
}

export class Player extends Node {


    @initial(new Vector2(0, -1))
    @vector2Signal()
    public declare readonly direction: Vector2Signal<this>

    @initial(15)
    @signal()
    public declare readonly radius: SimpleSignal<number, this>

    @initial("blue")
    @signal()
    public declare readonly color: ColorSignal<this>

    @initial(0)
    @signal()
    public declare readonly rotation: SimpleSignal<number, this>

    @initial(0)
    @signal()
    public declare readonly directionNodeLength: SimpleSignal<number, this>

    @signal()
    public declare readonly mapSettings: SimpleSignal<MapProps, this>

    public nodeRef = createRef<Node>()

    constructor(props?: PlayerProps) {
        super({ ...props })

        this.add(
            <Node ref={this.nodeRef}>
                <PlayerPlane direction={() => this.direction()} angle={33} />
                <Circle
                    fill={() => this.color()}
                    width={() => this.radius() * 2}
                    height={() => this.radius() * 2}
                />
                <Ray
                    from={() => this.nodeRef().position()}
                    to={() => this.nodeRef().position().add(this.direction().mul(this.directionNodeLength()))}
                    stroke={"orange"}
                    lineWidth={5}
                    endArrow
                    arrowSize={10}
                />

            </Node>
        )


        console.log(this.nodeRef().position().mul(100))
    }

    public * goForward(steps: number, delay: number) {
        yield* this.position(this.position().add(this.direction().mul(steps)), delay)
    }

    public * rotate(degress: number, delay: number) {
        yield* this.direction(this.direction().rotate(degress), delay)
    }

}