export interface IBenchmark{
    resetDB();
    testInserts();
    testReads();
    testQueries();
}