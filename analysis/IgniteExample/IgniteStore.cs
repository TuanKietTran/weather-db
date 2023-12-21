using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Apache.Ignite.Core;
using Apache.Ignite.Core.Client;

public class IgniteStore
{
  private readonly string _igniteHost;

  public IgniteStore(string igniteHost)
  {
    _igniteHost = igniteHost;
  }

  public async Task StoreCountriesData(string url, string cacheName)
  {
    // Load JSON data from the provided URL
    var jsonData = await LoadJsonData(url);

    // Start Ignite client
    var cfg = new IgniteClientConfiguration
    {

      Endpoints = new[] { _igniteHost }
    };

    using (var client = Ignition.StartClient(cfg))
    {
      // Create or get the cache
      var cache = client.GetOrCreateCache<int, Country>(cacheName);

      // Store data in the cache
      foreach (var country in jsonData)
      {
        cache.Put(country.Id, country);
      }

      Console.WriteLine("Data stored in Ignite cache successfully!");
    }
  }

  // Load JSON data from a URL
  private async Task<List<Country>> LoadJsonData(string url)
  {
    using (var httpClient = new HttpClient())
    {
      var json = await httpClient.GetStringAsync(url);
      // Deserialize JSON data to a List of Country objects
      var data = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Country>>(json);
      Console.WriteLine("JSON data loaded successfully!");
      return data ?? ([]);
    }
  }
}
