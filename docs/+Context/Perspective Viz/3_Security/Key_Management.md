<!-- phase:1 --><!-- draft -->
# Encryption & Recovery Flow

1. **Keypair creation** – On first launch, client generates `ed25519` keypair; private key encrypted with **AES‑GCM 256** using a user‑supplied passphrase.
2. **Recovery phrase** – 12‑word BIP‑39 seed stored **only client‑side** (optional print PDF).
3. **Signing** – Every snapshot SHA is signed; signature stored in `meta.signature`.
4. **Rotation** – Users can rotate keys; old public keys kept for signature validation.
5. **Self‑host** – Vault resides in IndexedDB; enterprise mode can redirect to HSM via WebCrypto SubtleCrypto.

*See Privacy_Compliance.md for GDPR erasure flow.*

# Key Management (MVP scope)

| Key type | Generated where | Stored | Rotation | Usage |
|----------|-----------------|--------|----------|-------|
| **Vault root** (Ed25519) | first run in browser | IndexedDB AES‑GCM, pw‑derived key | manual (CLI) | sign SyncMsg, snapshot commits |
| **Evidence blob SHA256** | client‑side on upload | `evidence.meta` | n/a | integrity check |
| **JWT signing key** | server (HS256 default) | env var / KMS | 90 d | Perspective API auth |
| **Docker image cosign** | CI runner | GitHub OIDC ➜ sigstore | each release | image integrity |

## 1 Root‑key Recovery

```bash
# cli/run.sh export-key
mnemonic: "toast eagle robust... zebra"
```

_12‑word BIP‑39 phrase_ can recreate private key offline.


## 2 Rotation Procedure (maintainer role)

```
`# rotate and re‑sign snapshots in vault npx pv-cli rotate-key --old <mnemonic> --new <new-mnemonic> # uploads a ReKey Commit with {old_pub, new_pub, sig}`
```


All future snapshots use the new key; old signatures remain valid.

## 3 Hardware Tokens (optional)

If `navigator.credentials` detects WebAuthn,  
PV prompts user to bind Yubikey / Passkey:

- context: `"pv-sign"`
    
- challenge: latest snapshot hash
    
- stored as `agent.webauthn_cred_id`
    

### Threat Matrix Tie‑in

|STRIDE class|Key‑management guard‑rail|
|---|---|
|_Spoofing_|Ed25519 signatures on every write op|
|_Tampering_|SHA‑256 chain‑hash + immutable evidence|
|_Repudiation_|Snapshot author_sig + server audit log|
|_Info leak_|Local AES‑GCM; server blobs encrypted at rest|
|_DoS_|rate‑limit on key‑gen attempts|
|_Elevation_|role matrix blocks “recover‑key” to admin only|

pgsql

Copy