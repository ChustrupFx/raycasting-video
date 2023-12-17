import { Line, Node, NodeProps, signal, vector2Signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, Vector2, Vector2Signal } from "@motion-canvas/core";

export interface PlayerPlaneProps extends NodeProps {

    angle: SignalValue<number>;
    direction: SignalValue<Vector2>;

}

export class PlayerPlane extends Node {

    @signal()
    public declare readonly angle: SimpleSignal<number, this>

    @vector2Signal()
    public declare readonly direction: Vector2Signal<this>

    constructor(props?: PlayerPlaneProps) {
        super({ ...props })

        let [point1, point2] = this.getPointsOfLine()

        this.add(

            <Line
                lineWidth={10}
                stroke={"red"}
                points={() => this.getPointsOfLine()}
            />

        )
    }

    private getPointsOfLine(): Vector2[] {
        let plane = this.plane()

        let point1 = this.position().add(this.direction()).add(this.plane().mul(100))
        let point2 = this.position().add(this.direction()).add(this.plane().mul(-100))
        console.log(point1);

        return [point1, point2]
    }

    public plane(): Vector2 {
        const distanceFromPlayer = 1
        const angle = this.angle()
        const halfOfPlane = Math.tan(angle * Math.PI / 180) * distanceFromPlayer

        const plane = new Vector2(0, halfOfPlane)
        const rotated = plane.rotate(this.direction().degrees)
        console.log(rotated);

        return rotated
    }


}