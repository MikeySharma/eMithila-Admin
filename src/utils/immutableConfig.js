const immutableConfig =  (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })

  export default immutableConfig;