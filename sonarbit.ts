/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
enum Distance_Unit {
    //% block="mm" enumval=0
    Distance_Unit_mm,

    //% block="cm" enumval=1
    Distance_Unit_cm,

    //% block="inch" enumval=2
    Distance_Unit_inch,
}


/**
 * Custom blocks
 */
//% color=#0fbc11 icon="\uf140"
namespace sonarbit {

    /**
    * get Ultrasonic distance
    */
    //% blockId=sonarbit block="Ultrasonic distance in unit %distance_unit |at|pin %pin"
    //% weight=10
    export function sonarbit_distance(distance_unit: Distance_Unit, pin: DigitalPin): number {

        // send pulse
        pins.setPull(pin, PinPullMode.PullNone)
        pins.digitalWritePin(pin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(pin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(pin, 0)

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 25000)  // 8 / 340 = 
        let distance = d / 58

        if (distance > 400) {
            distance = 0
        }

        switch (distance_unit) {
            case 0:
                return Math.floor(distance * 10) //mm
                break
            case 1:
                return Math.floor(distance)  //cm
                break
            case 2:
                return Math.floor(distance / 254)   //inch
                break
            default:
                return 0
        }

    }

}
