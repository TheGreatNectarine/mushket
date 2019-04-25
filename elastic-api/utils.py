import trafaret as T

TRAFARET = T.Dict({
    T.Key('host'): T.IP,
    T.Key('port'): T.Int(),
    T.Key('elastic-host'): T.IP,
    T.Key('elastic-port'): T.Int(),
})
