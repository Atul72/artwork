# Art Explorer — Kids' art discovery app

A React Native + Expo starter app using The Metropolitan Museum of Art Collection API.

## Features included

- Three-screen onboarding flow
- Four locally saved learning modes: ages 2–5, 6–8, 9–12, and a mixed-age family mode
- Age-level-appropriate quiz question sets
- Home screen with search, topic chips, and featured artwork
- Search with public-domain image filtering and paginated “Load more”
- Artwork gallery cards and artwork detail screen
- Artist profile / explore more by artist
- Favorites saved locally on the device
- Categories screen
- Five-question interactive art quiz with score
- Rotating “Did you know?” cards
- More screen and About / sources / privacy notes
- Child-friendly pastel UI, empty/error/loading states, and accessibility labels on key controls

## Requirements

- Node.js LTS
- npm
- Expo-compatible development setup (Expo Go or Android emulator; a development build may be needed when Expo Go no longer supports the SDK version installed on the project)

## Run it in VS Code

1. Extract this folder.
2. Open `ArtExplorer` in VS Code.
3. Open Terminal in this folder.
4. Install packages:

   ```bash
   npm install
   ```

5. Start Expo:

   ```bash
   npx expo start
   ```

6. Scan the QR code with a compatible Expo Go app. Press `a` for an Android emulator; on macOS with Xcode installed, press `i` for an iOS simulator. You can also run the project on a physical iPhone using Expo Go when compatible with the project SDK.

## Build installable apps

Expo Go is for development previews. To create store-ready Android/iOS builds, use Expo Application Services (EAS):

```bash
npm install --global eas-cli
eas login
eas build:configure
eas build --platform android
eas build --platform ios
```

EAS builds run in the cloud. Publishing requires your own store accounts and identifiers; iOS distribution requires Apple Developer program access. Test the app and complete the privacy and child-safety review before submitting to either store.

## API

Search endpoint (paginated):

`https://collectionapi.metmuseum.org/public/collection/v1.1/search`

Object detail endpoint:

`https://collectionapi.metmuseum.org/public/collection/v1/objects/{objectID}`

No API key is required by The Met at the time this starter was prepared. This app asks the API to filter for public-domain artworks, fetches 10 IDs per page, processes object details in batches of 5, and caches recent pages on the device for 24 hours. It also checks `isPublicDomain === true` and `primaryImageSmall` in the returned records.

Official API documentation: https://metmuseum.github.io/

## Important notes before publishing

- This is a functional MVP/source starter, not a certified child-safety product or a guarantee of Google Play / App Store approval.
- The artwork API can return missing, sparse, or unsuitable metadata. Review artwork results and curate age-appropriate content before releasing the app to children.
- The app stores favorites and onboarding completion locally with AsyncStorage; it does not ask the child for an account, name, location, or contact details.
- Add a parent-facing privacy policy and review current Google Play Families, Apple's Kids category, and relevant privacy requirements before release.
- The app is not affiliated with The Metropolitan Museum of Art. Follow the museum API terms and image rights details. This starter only displays API records marked public domain, but a production release should still validate content and rights.
- The period chips are a visual preference in this starter and are not yet connected to a date filter in The Met API.
- Learning level is stored locally on the device; it is a mode preference, not a request for the child's birth date or identity. The Family Mix quiz intentionally alternates question difficulty.
- The project is configured for both Android and iOS. Set your own unique Android package name and iOS bundle identifier before publishing; `com.example.artexplorerkids` is a placeholder. Building iOS locally requires macOS and Xcode, or you can use an Expo/EAS cloud build.

## Suggested next improvements

- Add a parent gate before external links.
- Curate approved searches/artwork IDs for younger age groups.
- Artwork search pages cached on-device for 24 hours (up to 20 recent search pages); stale cache is used if refresh fails.
- Server-side public-domain filtering, smaller 10-item pages, and five-at-a-time metadata requests.
- Further speed option: pre-curate a local JSON catalog of a few hundred approved artworks for instant first paint and offline access.
- Add unit tests, app icon, splash assets, and final store privacy disclosures.
