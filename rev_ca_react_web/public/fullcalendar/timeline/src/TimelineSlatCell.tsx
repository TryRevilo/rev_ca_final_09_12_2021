import {
  createElement, isInt, BaseComponent, DateMarker, Ref, DateRange, getDateMeta, getSlotClassNames, RenderHook, getDayClassNames, SlotLaneHookProps
} from '@fullcalendar/common'
import { TimelineDateProfile } from './timeline-date-profile'


export interface TimelineSlatCellProps {
  date: DateMarker
  tDateProfile: TimelineDateProfile
  nowDate: DateMarker
  todayRange: DateRange
  isDay: boolean
  isEm: boolean
  elRef?: Ref<HTMLTableCellElement>
}


export class TimelineSlatCell extends BaseComponent<TimelineSlatCellProps> {

  render() {
    let { props, context } = this
    let { dateEnv, options, theme } = context
    let { date, tDateProfile, isEm } = props
    let dateMeta = getDateMeta(props.date, props.todayRange, props.nowDate)
    let classNames = [ 'fc-timeline-slot', 'fc-timeline-slot-lane' ]
    let dataAttrs = { 'data-date': dateEnv.formatIso(date, { omitTimeZoneOffset: true, omitTime: !tDateProfile.isTimeScale }) }
    let hookProps: SlotLaneHookProps = {
      date: dateEnv.toDate(props.date),
      ...dateMeta,
      view: context.viewApi
    }

    if (isEm) {
      classNames.push('fc-timeline-slot-em')
    }

    if (tDateProfile.isTimeScale) {
      classNames.push(
        isInt(dateEnv.countDurationsBetween(
          tDateProfile.normalizedRange.start,
          props.date,
          tDateProfile.labelInterval
        )) ?
          'fc-timeline-slot-major' :
          'fc-timeline-slot-minor'
      )
    }

    classNames.push(...(
      props.isDay
        ? getDayClassNames(dateMeta, theme)
        : getSlotClassNames(dateMeta, theme)
    ))

    return (
      <RenderHook
        hookProps={hookProps}
        classNames={options.slotLaneClassNames}
        content={options.slotLaneContent}
        didMount={options.slotLaneDidMount}
        willUnmount={options.slotLaneWillUnmount}
        elRef={props.elRef}
      >
        {(rootElRef, customClassNames, innerElRef, innerContent) => (
          <td
            ref={rootElRef}
            className={classNames.concat(customClassNames).join(' ')}
            {...dataAttrs}
          >
            <div ref={innerElRef}>{innerContent}</div>
          </td>
        )}
      </RenderHook>
    )
  }

}
