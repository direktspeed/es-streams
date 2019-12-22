# Renamed some exports of scheduler
- asap,periodic,delay => scheduleAsap,schedulePeriodic,scheduleDelay
- as a new convention 
  - schedule* references that it operates on tasks
  - scheduler* references that it returns a SchedulerInstance
# Renamed exports of prelude
- map => mapArray
- as a new convention the prelude Operations get renamed to operatorArray or type the operate on
# Renamed exports of disposeable
- tryDispose => tryDisposeErrorToSink
