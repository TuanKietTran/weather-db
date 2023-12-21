class Program
{
    static async Task Main()
    {
        var igniteHost = "0.0.0.0"; // Replace with the IP address or hostname of your Ignite server
        var igniteStore = new IgniteStore(igniteHost);

        var jsonUrl = "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json";
        var cacheName = "countriesCache";

        await igniteStore.StoreCountriesData(jsonUrl, cacheName);
    }
}
