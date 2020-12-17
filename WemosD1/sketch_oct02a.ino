#include <Adafruit_MLX90614.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define MSG_BUFFER_SIZE  (50)

//const char* ssid = "Viettel_GPDN";
//const char* password = "123456789aA@";
//const char* mqtt_server = "10.61.229.217";
const char* ssid = "KentVipPro";
const char* password = "Thanhtu69";
const char* mqtt_server = "broker.emqx.io";
//const char* mqtt_server = "192.168.43.67";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
char msg[MSG_BUFFER_SIZE];
int value = 0;

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
 
void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address2: ");
  Serial.println(WiFi.localIP());
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "tessssssss";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      // ... and resubscribe
//      client.subscribe("");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Init");
  Serial.println("Hello world");
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  //reconnect();
  client.setCallback(callback);
  mlx.begin();
}

void loop() {
  delay(1000);
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  Serial.print("Publish message: ");
  Serial.println("ABCEDEF");

//  char msg[256];
//  memset(msg, 0, 256);
//  sprintf(msg, "%");
  
  String resultData = String(mlx.readObjectTempC()) ; 
 
  client.publish("myTopicPub", resultData.c_str());
  
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC()); 
  Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF()); 
  Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); Serial.println("*F");
  
  Serial.println();
  
//  digitalWrite(13, HIGH);
//  delay(2000);
//  digitalWrite(13, LOW);
}
