basic.show_icon(IconNames.HEART)

def on_forever():
    pins.servo_write_pin(AnalogPin.P6, 0)
    basic.pause(1000)
    pins.servo_write_pin(AnalogPin.P16, 145)
    basic.pause(1000)
    pins.servo_write_pin(AnalogPin.P6, -45)
    basic.pause(1000)
    pins.servo_write_pin(AnalogPin.P16, 0)
    basic.pause(1000)
basic.forever(on_forever)
